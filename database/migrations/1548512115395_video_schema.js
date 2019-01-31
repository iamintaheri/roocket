'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.string('title',80)
      table.integer('price')
      table.text('description')
      table.integer('likes')
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideoSchema
