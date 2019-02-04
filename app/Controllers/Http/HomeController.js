'use strict'

const Video = use('App/Models/Video')
const Drive = use('Drive')
const Helpers = use('Helpers')

const fs = use('fs')
class HomeController {

    async index({view})
    {
        const videos = await Video.all()

        return view.render('index',{ videos :videos.toJSON()})
    }

    async videoDetails({params , view})
    {
        const {id} = params
       
        const video = await Video.query().where('id',id).with('sections').withCount('users').first()
        
        return view.render('videodetail',{ video : video.toJSON() }) 
    }

    async order({auth , response,params})
    {
        if(auth.check())
        {
            const {vId} = params
            let user = auth.user 
   
            try{
                await user.videos().attach(vId)
            }
            catch(e)
            {
                console.log(e)
            }
            return response.redirect('/panel')
        }
        else
            return response.redirect('/login')
    }

    async vStream({request , response})
    {
        const path = 'public/sample.mp4'
        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = request.headers.range
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-")
          const start = parseInt(parts[0], 10)
          const end = parts[1] 
            ? parseInt(parts[1], 10)
            : fileSize-1
          const chunksize = (end-start)+1
          const file = fs.createReadStream(path, {start, end})
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
          }
          response.writeHead(206, head);
          file.pipe(response);
        } else {
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
          }
          response.header('Content-Length', fileSize)
          response.header('Content-Type','video/mp4')
          
          fs.createReadStream(path).pipe(response)
        }
    }
}

module.exports = HomeController
