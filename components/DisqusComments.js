
import {DiscussionEmbed} from "disqus-react"

const DisqusComments = ({post}) => {
    const disqusShortname = "diariocivitas-com"
    const disqusConfig = {
      url: `http://localhost:3000/${post?.rutaURL}`,
      identifier: post?._id, // Single post id
      title: post?.titulo // Single post title
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

