import axios from 'axios'
import { AuthApiFactory } from './api/auth-api'
import { JobCategoryApiFactory } from './api/job-category-api'
import { ProjectApiFactory } from './api/project-api'
import { RecruitmentApiFactory } from './api/recruitment-api'
import { UserApiFactory } from './api/user-api'
import { ProjectMilestoneApiFactory } from './api/project-milestone-api'
import { Configuration } from './configuration'
import { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast'
import { invariant, noop } from 'es-toolkit'
import { LOCAL_STORAGE_KEY } from '@constants/localStorageKey'
import { ProjectMilestoneTaskApiFactory, ProjectWorkerWorkHistoryApiFactory } from '@apis/api'
// import { redirect } from 'react-router'

export const API_URL = import.meta.env.VITE_APP_API

class APIClient {
  public client = axios.create({
    withCredentials: true,
    timeout: 10000,
  })

  private readonly configuration = new Configuration()

  // 새로운 API Factory가 있는 경우 아래 다른 API와 같이 Factory 클래스를 추가해주세요.
  readonly Auth = AuthApiFactory(this.configuration, API_URL, this.client)
  readonly User = UserApiFactory(this.configuration, API_URL, this.client)
  readonly JobCategory = JobCategoryApiFactory(this.configuration, API_URL, this.client)
  readonly Project = ProjectApiFactory(this.configuration, API_URL, this.client)
  readonly Recruitment = RecruitmentApiFactory(this.configuration, API_URL, this.client)
  readonly Milestone = ProjectMilestoneApiFactory(this.configuration, API_URL, this.client)
  readonly Task = ProjectMilestoneTaskApiFactory(this.configuration, API_URL, this.client)
  readonly WorkHistory = ProjectWorkerWorkHistoryApiFactory(this.configuration, API_URL, this.client)
}

export const client = new APIClient()

client.client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`)
    }
    return config
  },
  (error) =>
    // https://github.com/axios/axios/issues/1556
    // 해당 에러 불리지 않는다. 따라서 TC도 할 수 없다.
    Promise.reject(error),
)

let retryCount = 0

client.client.interceptors.response.use(
  (response: AxiosResponse) => {
    retryCount = 0
    return response
  },
  async (error) => {
    if (error instanceof AxiosError) {
      invariant(!!error.response, "error.response is undefined")

      // 3번 이상 재시도시 오류 throw 
      if (retryCount >= 3) {
        retryCount = 0;
        throw error
      }

      retryCount++

      // 401 에러 -> 토큰 재발급
      if (error.response.status === 401) {
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)

        // 자동 로그인 설정하지 않았다면 로그인 페이지로 이동
        const isAutoLoginMode = localStorage.getItem(LOCAL_STORAGE_KEY.AUTO_LOGIN)

        if (isAutoLoginMode === "false" || !isAutoLoginMode) {
          localStorage.removeItem(LOCAL_STORAGE_KEY.AUTO_LOGIN)
          window.location.href = "/auth/sign-in?session_expired=true"
        }

        const response = await client.Auth.renewalAccessToken().catch(noop);
        const accessToken = response?.data.result?.accessToken ?? ""
        
        // 토큰 요청 실패시 로그인 페이지로 이동
        if (!response || !accessToken) {
          localStorage.removeItem(LOCAL_STORAGE_KEY.AUTO_LOGIN)
          window.location.href = "/auth/sign-in?session_expired=true"
        }

        // accessToken 재설정
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
        client.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // API 재요청
        return client.client.request(error.response.config)
      }

      throw error.response.data
    }

    toast.error("알 수 없는 오류가 발생했습니다.");
    throw error
  },
)
