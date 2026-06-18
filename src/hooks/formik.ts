import { get } from "es-toolkit/compat"
import { useFormikContext } from "formik"

export function useFieldError(name: string) {
  const { errors, touched } = useFormikContext()
  return !!get(errors, name) && !!get(touched, name)
}
