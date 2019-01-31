'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionSchema extends Schema {
  up () {
    this.create('sections', (table) => 
    {
      table.increments()
      table.string('title')
      table.integer('duration')
      table.integer('video_id').unsigned().references('id').inTable('videos').onDelete('cascade')
      table.string('fileName',150)
      table.timestamps()
    })
  }

  down () {
    this.drop('sections')
  }
}

module.exports = SectionSchema
