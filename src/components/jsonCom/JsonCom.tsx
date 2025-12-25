import { useEffect, useState } from "react"

export const JsonCom = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [activePostId, setActivePostId] = useState(null)
    const [postComments, setPostComments] = useState([])

    const handleClick = (id) => {
        setActivePostId(id)
    }

    useEffect(() => {
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setPosts(json)
        setLoading(false)
    })
    }, [])

    useEffect(() => {
        if(activePostId) {
        setLoading(true)
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${activePostId}`)
        .then(response => response.json())
        .then(json => {
            setPostComments(json)
            setLoading(false)
        })

        }
    }, [activePostId])

  return (
    <div>
        {loading && <h1>Loading...</h1>}
        <div>
            <h1>{postComments.length ? 'Comments' : 'Posts'}</h1>
            {postComments.length ? <button onClick={() => setPostComments([])}>Назад</button> : null}
            {postComments.length ? postComments.map(comment => (
            <div key={comment.id}>
                {comment.name}
            </div>
        )) : posts.map(post => (
            <div key={post.id} style={{border: '1px solid', margin: 30, cursor: 'pointer'}} onClick={() => {
                if(loading) return
                handleClick(post.id)
            }}>
                <p>{post.title}</p>
            </div>
        ))}
        </div>
    </div>
  )
}
