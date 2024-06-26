import { isLocal } from "@basedev/common/utils/isLocal"
import { HOST } from "constants/urls"
import { isProd } from "utils/isProd"

export const getBaseURL = () => {
  if (isProd()) {
    return `https://${HOST}`
  } else if (isLocal()) {
    return `http://localhost:7091`
  }
}
