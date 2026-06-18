import { isArray } from "es-toolkit/compat"
import { Children } from "react"
import type { ComponentType, ReactElement } from "react"

/**
 * children prop을 배열로 변환합니다.
 *
 * @param children - children prop
 * @returns 자식 컴포넌트 배열
 */
export function toChildrenArray<T extends ReactElement>(children: T | T[]) {
  return Children.toArray(children) as T[]
}

/**
 * children 배열 에서 특정 컴포넌트를 찾아 반환합니다.
 *
 * @param children - 자식 컴포넌트
 * @param type - 찾을 컴포넌트
 * @returns 찾은 컴포넌트
 */
export function findChild<U, T extends ReactElement = ReactElement>(
  children: T[],
  type: ComponentType<U>,
) {
  return children.find((child) => child.type === type)
}

/**
 * children 배열 에서 특정 컴포넌트를 찾아 배열의 형태로 반환합니다.
 *
 * @param children - 자식 컴포넌트
 * @param type - 찾을 컴포넌트
 * @returns 찾은 컴포넌트
 */
export function filterChild<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Components extends ComponentType<any>,
  T extends ReactElement = ReactElement,
>(children: T[], type: Components | Components[]) {
  return children.filter((child) => {
    return isArray(type)
      ? !!type.find((t) => t === child.type)
      : child.type === type
  })
}
