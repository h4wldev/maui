
export const makeProp = (
  type,
  default_ = undefined,
  required = false,
  validator = undefined
) => {
  if (Array.isArray(validator)) {
    const availables = validator

    validator = v => availables.includes(v)
  }

  return {
    type,
    required,
    default: default_,
    validator
  }
}
