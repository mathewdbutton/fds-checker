const decvValidations = {
  heatFluxCheck: (field_instance) => {
    return field_instance.contents.includes("QUANTITY='RADIATIVE HEAT FLUX GAS'")
  },
  heatFluxOrientationCheck: (field_instance) => {
    if (!field_instance.contents.includes("ORIENTATION")) return false

    const [nothing, orientation] = field_instance.contents.match(/ORIENTATION=(.*)\//)
    const [x, y, z] = orientation.split(",")
    return z === "1.0"
  },
  temperatureCheck: (field_instance) => {
    return field_instance.contents.includes("QUANTITY='TEMPERATURE'")
  },
  validate: (field_instances) => {
    const heatFluxResult = field_instances.filter(decvValidations.heatFluxCheck);
    const temperatureResult = field_instances.filter(decvValidations.temperatureCheck);
    const heatFluxOrientationResult = heatFluxResult.filter(decvValidations.heatFluxOrientationCheck);

    return {
      heatFluxResult, heatFluxOrientationResult, temperatureResult
    }
  },
  report: (results) => {
    return [
      {
        check: "Heat Flux Device Present",
        passed: results.heatFluxResult.length > 0,
        results: results.heatFluxResult
      },
      {
        check: "Heat Flux Device Z Orientation",
        passed: results.heatFluxOrientationResult.length === results.heatFluxResult.length,
        results: results.heatFluxOrientationResult
      },
      {
        check: "Temperature Device Present",
        passed: results.temperatureResult.length > 0,
        results: results.temperatureResult
      }
    ]
  }
}
