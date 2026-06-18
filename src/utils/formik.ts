import { getIn } from "formik"
import type { FormikContextType } from "formik"

export const createIsErrorFn =
  <V>(formik: FormikContextType<V>) =>
  (name: string | string[]) =>
    getIn(formik.errors, name) && getIn(formik.touched, name)
