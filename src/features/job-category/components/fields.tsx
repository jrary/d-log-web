import { FrameworkField } from "@features/job-category/components/framework-field"
import { JobCategoryField } from "@features/job-category/components/job-category-field"
import { LanguageField } from "@features/job-category/components/language-field"
import { RoleField } from "@features/job-category/components/role-field"

export function JobCategoryFields() {
  return (
    <>
      <JobCategoryField />

      <RoleField />

      <FrameworkField />

      <LanguageField />
    </>
  )
}
