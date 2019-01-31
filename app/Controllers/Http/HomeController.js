'use strict'

const Video = use('App/Models/Video')
class HomeController {

    async index({view})
    {
        const videos = await Video.all()

        return view.render('index',{ videos :videos.toJSON()})
    }

    async videoDetails({params , view})
    {
        const {id} = params
        const video = await Video.query().where('id',id).with('sections').first()
        console.log(video.toJSON())
        
        return view.render('videodetail',{ video : video.toJSON() }) 
    }
}

module.exports = HomeController
