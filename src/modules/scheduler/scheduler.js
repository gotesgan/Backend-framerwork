import cron from 'node-cron';
// this is a basic scheduler example using node-cron
// modify as per your requirements
// supports cron expressions for flexible scheduling
// you can schedule tasks to run at specific intervals, dates, or times
// refer to https://www.npmjs.com/package/node-cron for cron syntax and options
/**
 * Schedule a task with flexible options
 * @param {Function} taskFn - The function to execute
 * @param {Object} options - Scheduling options
 *  {
 *    type: 'daily' | 'hourly' | 'weekly' | 'once',
 *    time: 'HH:MM',       // for daily/weekly
 *    dayOfWeek: 0-6,      // for weekly (0 = Sunday)
 *    date: 'YYYY-MM-DD',  // for once
 *    hour: 0-23,          // optional override
 *    minute: 0-59,        // optional override
 *    immediate: boolean   // run task immediately for testing
 *  }
 */
export const scheduleTask = (taskFn, options = {}) => {
  let cronExp;

  const {
    type,
    time = '00:00',
    dayOfWeek,
    date,
    hour,
    minute,
    immediate,
  } = options;
  const [tHour, tMinute] = time.split(':').map(Number);

  // Run immediately if flag is true
  if (immediate) {
    console.log('Running task immediately for testing...');
    taskFn();
  }

  switch (type) {
    case 'hourly':
      cronExp = `${minute ?? tMinute} * * * *`; // every hour at minute
      break;

    case 'daily':
      cronExp = `${minute ?? tMinute} ${hour ?? tHour} * * *`; // every day at HH:MM
      break;

    case 'weekly':
      if (dayOfWeek === undefined)
        throw new Error('dayOfWeek is required for weekly tasks');
      cronExp = `${minute ?? tMinute} ${hour ?? tHour} * * ${dayOfWeek}`; // weekly at HH:MM
      break;

    case 'once':
      if (!date) throw new Error('date is required for one-time tasks');
      const runDate = new Date(
        `${date}T${hour ?? tHour}:${minute ?? tMinute}:00`
      );
      const delay = runDate.getTime() - Date.now();
      if (delay <= 0) throw new Error('Scheduled date must be in the future');

      // Use setTimeout for one-time execution
      setTimeout(() => {
        taskFn();
      }, delay);
      return; // exit, no cron needed

    default:
      throw new Error(
        'Invalid type. Use "hourly", "daily", "weekly", or "once".'
      );
  }

  // Schedule cron job
  const job = cron.schedule(cronExp, taskFn, { scheduled: true });
  console.log(`Task scheduled: ${type} -> ${cronExp}`);
  return job; // you can call job.stop() or job.start() later
};
