const sliceFileValidation = {
  existenceCheck: (field_instance) => {
    return field_instance.contents
  },
  sliceFileZAxisCheck: (field_instance) => {
    return field_instance.contents.includes("PBZ=")
  },
  validate: (field_instances) => {
    return {
      existenceResult: field_instances.filter(sliceFileValidation.existenceCheck),
      sliceFileZAxisResult: field_instances.filter(sliceFileValidation.sliceFileZAxisCheck),
    }
  },
  report: (results) => {
    return [
      {
        check: "At least one Slice File present",
        passed: results.existenceResult.length > 0,
        results: results.existenceResult
      },
      {
        check: "At least two Z axis Slice Files present",
        passed: results.sliceFileZAxisResult.length >= 2,
        results: results.sliceFileZAxisResult
      }
    ]
  }
}
