
const asPercent = (float, precision = 2) => `${(float * 100).toFixed(precision)}%`;

/**
 * Builds out a summary and timeline of a guide's steps and coffee
 *
 * @param {List<Step>} steps The steps of a guide
 * @param {any} coffee The coddee details of a guide
 * @return {Summary} The resulting summary
 */
export const buildSummary = (steps, coffee) => {

  const totalSteps = steps.length;
  const totalTime = steps.reduce((t, s) => t + s.duration + s.drainDuration, 0);
  const totalDose = steps.reduce((t, s) => t + s.dose, 0);
  const ratio = coffee.amount > 0 ? `${coffee.amount / coffee.amount}:${(totalDose / coffee.amount).toFixed(2)}` : "Missing Coffee Amount."

  const waterDistribution = steps.map(step => {
    return {
      label: step.title,
      value: asPercent(step.dose / totalDose),
    };
  });

  // interpolate each step into points
  let accumulatedTime = 0;
  let accumulatedDose = 0;

  const timeline = steps.reduce( (points, step) => {

    const { dose, duration, drainDuration } = step;

    let durationPeriod = duration;
    // dont interpolate zero-based steps
    if (dose <= 1 || duration <= 1) {
      return points;
    }

    // the amount of water that will increase each second
    const rate = dose / duration;

    // break up each step into its second-by-second points
    new Array(duration + drainDuration)
      .fill(true)
      .forEach( (t, i) => {

        const currentTime = accumulatedTime + 1;
        const isDraining = drainDuration > 0 && durationPeriod === 0;

        // the accumulate dose
        let currentDose = accumulatedDose + rate;

        // we don't accumulate while draining
        if (isDraining) {
          currentDose = accumulatedDose;
        }

        const point = {
          time: currentTime,
          isDraining,
          dose: isDraining ? 0 : rate,
          accumulatedDose: currentDose,
          accumulatedDosePercent:  asPercent(currentDose / totalDose),
          accumulatedTimePercent: asPercent(currentTime / totalTime),
          step: step.id
        };

        // update tallies
        accumulatedTime = currentTime;
        accumulatedDose = currentDose;
        durationPeriod = Math.max(0, durationPeriod - 1);

        points.push(point);
      });

      return points;

  }, []);


  // build a human readable time
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  const time = `${minutes}:${seconds}`;

  return {
    totalSteps,
    totalTime,
    totalDose,
    ratio,
    waterDistribution,
    timeline,
    humanReadable: {
      minutes,
      seconds,
      time,
    },
  };

};