import { milestoneFormValidationSchema } from "@features/dashboard/projects/milestones/schemas/milestone-form-validation-schema"
import { useFormik } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
import type { ProjectMilestoneListDto } from "@apis/model"
import type { MilestoneFormValidationSchema } from "@features/dashboard/projects/milestones/schemas/milestone-form-validation-schema"

type Args = {
  initialValues?: Partial<ProjectMilestoneListDto>
  onSubmit: (values: MilestoneFormValidationSchema) => Promise<void>
}

const defaultValues: MilestoneFormValidationSchema = {
  milestoneName: "",
  milestoneObjective: "",

  milestoneStartDate: null,
  milestoneEndDate: null,
}

export function useMilestoneForm({ initialValues, onSubmit }: Args) {
  return useFormik({
    enableReinitialize: true,
    validate: toFormikValidate(milestoneFormValidationSchema),
    initialValues: {
      ...defaultValues,
      ...milestoneFormValidationSchema.partial().parse(initialValues ?? {}),
    },
    onSubmit: (values) => {
      return onSubmit(milestoneFormValidationSchema.parse(values))
    },
  })
}
