/**
 * Cron job scheduling module for Discord.js client
 * Provides utilities for scheduling recurring Discord messages and actions.
 * Uses node-cron for schedule management.
 * @see https://crontab.guru/ for cron syntax reference
 * @see https://discord.js.org/#/docs/discord.js/v13/typedef/MessageOptions for message options
 */

const { schedule } = require('node-cron');

/**
 * Cron job scheduler class for managing scheduled Discord bot actions
 * @class cronJobHelper
 */
class cronJobHelper {
  /**
   * Creates a new cronJob instance
   * @constructor
   * @param {object} client - The Discord.js client instance
   * @param {string} channelId - Default channel ID for scheduling messages (can be overridden per method)
   */
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }

  /**
   * Schedule a simple text message to be sent at recurring intervals
   * @param {string} period - Cron expression for schedule (e.g., '0 * * * *' for hourly)
   * @param {string} message - Plain text message content to send
   * @param {string} [channelId] - Discord channel ID to send message to
   * @throws {Error} If channelId is not provided and no default is set
   * @returns {void}
   */
  setPlainMessage(period, message, channelId = this.channelId) {
    if (channelId === undefined) {
      throw new Error('Channel ID not provided');
    }

    schedule(period, async () => {
      console.log(this.client.channels.cache.get(channelId));
      await this.client.channels.cache.get(channelId).send({ content: message });
    });
  }

  /**
   * Schedule an embedded message to be sent at recurring intervals
   * @param {string} period - Cron expression for schedule
   * @param {object[]} embed_message - Array of Discord embed objects to send
   * @param {string} [channelId] - Discord channel ID to send message to
   * @throws {Error} If channelId is not provided and no default is set
   * @returns {void}
   */
  setEmbedMessage(period, embed_message, channelId = this.channelId) {
    if (channelId === undefined) {
      throw new Error('Channel ID not provided');
    }

    schedule(period, async () => {
      await this.client.channels.cache.get(channelId).send({ embeds: embed_message });
    });
  }

  /**
   * Schedule a message with custom MessageOptions to be sent at recurring intervals
   * Accepts any valid Discord.js MessageOptions object for maximum flexibility
   * @param {string} period - Cron expression for schedule
   * @param {(string | object)} content - Discord.js MessageOptions object
   * @param {string} [channelId] - Discord channel ID to send message to
   * @throws {Error} If channelId is not provided and no default is set
   * @returns {void}
   * @see https://discord.js.org/#/docs/discord.js/v13/typedef/MessageOptions for content structure
   */
  setFreeMessage(period, content, channelId = this.channelId) {
    if (channelId === undefined) {
      throw new Error('Channel ID not provided');
    }

    schedule(period, async () => {
      await this.client.channels.cache.get(channelId).send(content);
    });
  }

  /**
   * Schedule a custom action to execute at recurring intervals
   * @param {string} period - Cron expression for schedule
   * @param {Function} action - Callback function to execute on schedule
   * @returns {void}
   */
  setRepeatAction(period, action) {
    schedule(period, action);
  }
}

module.exports = {
  /**
   * The cronJob class for managing scheduled Discord bot actions
   * @type {cronJobHelper}
   */
  object: cronJobHelper,
  /**
   * Cron expression: Every minute
   * @type {string}
   */
  MINUTE: '* * * * *',
  /**
   * Cron expression: Every hour at the top of the hour
   * @type {string}
   */
  HOUR: '0 * * * *',
  /**
   * Cron expression: Daily at 00:00 (midnight)
   * @type {string}
   */
  DAILY: '0 */24 * * *',
  /**
   * Cron expression: First day of every month at 00:00
   * @type {string}
   */
  MONTH: '0 0 1 * *',
};
