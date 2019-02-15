const common = require('../../config-common')

module.exports = {
  client_id: '',
  client_secret: '',
  db_url: common.db_url,
  mongo_options: common.mongo_options,
  event_fields: [
    'id',
    'updated_time',
    'type',
    'name',
    'attending_count', // Number of people attending the event
    'declined_count', // Number of people who declined the event
    'interested_count', // Number of people interested in the event
    'maybe_count', // Number of people who maybe going to the event
    'noreply_count', // Number of people who did not reply to the event
    'category', // Category of the event
    'cover', // Cover picture
    'owner', // The profile that created the event
    'description',
    'start_time',
    'end_time',
    'is_canceled',
    'is_page_owned', // Whether the event is created by page or not
    'place',
    'ticket_uri', // The link users can visit to buy a ticket to this event
    'ticketing_privacy_uri',
    'ticketing_terms_uri',
    'timezone',
  ],
  event_fields_update: [
    'name',
    'attending_count', // Number of people attending the event
    'declined_count', // Number of people who declined the event
    'interested_count', // Number of people interested in the event
    'maybe_count', // Number of people who maybe going to the event
    'noreply_count', // Number of people who did not reply to the event
    'cover', // Cover picture
    'owner', // The profile that created the event
    'description',
    'start_time',
    'end_time',
    'is_canceled',
    'place',
    'ticket_uri', // The link users can visit to buy a ticket to this event
    'ticketing_privacy_uri',
    'ticketing_terms_uri',
    'timezone',
  ],
}