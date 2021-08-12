
import {DiscussionEmbed} from "disqus-react"

const DisqusComments = ({post}) => {
    const {_id, rutaURL, titulo} = post
    const disqusShortname = "diariocivitas-com"
    const disqusConfig = {
      url: `http://localhost:3000/${rutaURL}`,
      identifier: _id, // Single post id
      title: titulo // Single post title
    }
    return (
        <div className="w-full h-max pb-4">
            <DiscussionEmbed
             shortname={disqusShortname}
             config={disqusConfig}
        />
        </div>
    )
}

export default DisqusComments

