/**
 * Task list item structure
 * @typedef {object} ListItem
 * @property {string} name - Name of the task
 * @property {string} [period] - Cron expression for "other" type
 * @property {Function} task - Task function to execute
 */

/**
 * Period type for task scheduling
 * @typedef {'minute' | 'hour' | 'daily' | 'month' | 'other'} Period
 */

/**
 * Task scheduler class for managing cron jobs
 * @class TaskScheduler
 */
class TaskScheduler {
  /**
   * Creates a new TaskScheduler instance
   * @constructor
   */
  constructor() {
    /**
     * Map of scheduled tasks organized by interval type
     * @type {Map<Period, Set<ListItem>}
     */
    this.taskList = new Map([
      ['minute', new Set()],
      ['hour', new Set()],
      ['daily', new Set()],
      ['month', new Set()],
      ['other', new Set()],
    ]);
  }

  /**
   * Get a list of the jobs per minute
   * @returns {Set<ListItem>} - Number of jobs in an Object
   */
  get minuteJobs() {
    return this.taskList.get('minute');
  }

  /**
   * Get a list of the hourly jobs
   * @returns {Set<ListItem>} - Number of jobs in an Object
   */
  get hourJobs() {
    return this.taskList.get('hour');
  }

  /**
   * Get a list of the daily jobs
   * @returns {Set<ListItem>} - Number of jobs in an Object
   */
  get dailyJobs() {
    return this.taskList.get('daily');
  }

  /**
   * Get a list of the monthly jobs
   * @returns {Set<ListItem>} - Number of jobs in an Object
   */
  get monthJobs() {
    return this.taskList.get('month');
  }

  /**
   * Get a list of the jobs
   * @returns {Record<Period, number>} - Number of jobs in an Object
   */
  get jobsCount() {
    const list = Array.from(this.taskList.entries()).map(([key, value]) => [key, value.size]);
    list.push('Total', list.reduce((total, [_, count]) => total + count));

    return Object.fromEntries(list);
  }

  /**
   * Get a list of the jobs
   * @returns {string} - Job list
   */
  get jobList() {
    const c = require('ansis');
    const output = [];

    Array.from(this.taskList.entries()).forEach(([period, list], index) => {
      if (list.size > 0) {
        output.push(c.cyan.bold`${capitalize(period)}:`);
        list.forEach(item => output.push(`${c.cyan('-')} ${item.period ? c.green`[${item.period}]` : ''} ${item.name}`));
      } else {
        output.push(`${c.cyan.bold`${capitalize(period)}:`} None`);
      }
    });

    return output.join('\n');
  }

  /**
   * Add task to the task list
   * @param {Period} period - Period type for task scheduling
   * @param {ListItem} task - Task name and function to be executed
   *
   * @returns {boolean} - Success or not
   */
  addTask(period, task) {
    const list = this.taskList.get(period);
    if (list && task.name) {
      list.add(task);
      return true;
    }
    return false;
  }
}

/**
 * Capitalize the first letter of a word (Support single word only)
 * @param {string} str - The word to be processed
 * @returns {string} - Capitalized word
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const scheduler = new TaskScheduler();

module.exports = scheduler;
