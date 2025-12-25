import { useEffect, useState } from "react"
import styles from './index.module.css'
import { Button } from './../Button/Button';

interface Posts {
    id: number,
    title: string
}

interface Comments {
    id: number,
    name: string
}

export const PostsAndComments = () => {

    const [posts, setPosts] = useState<Posts[]>([])
    const [loading, setLoading] = useState(false)
    const [activePostId, setActivePostId] = useState(null)
    const [postComments, setPostComments] = useState<Comments[]>([])

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
        <div className={styles.wrapper}>
            <h1>{postComments.length ? 'Comments' : 'Posts'}</h1>
            {loading && <h3>Loading...</h3>}
            {postComments.length ? postComments.map(comment => (
            <div key={comment.id} className={styles.commentBlock}>
                {comment.name}
            </div>
        )) : posts.map(post => (
            <div key={post.id} className={styles.postBlock} onClick={() => {
                if(loading) return
                handleClick(post.id)
            }}>
                <p>{post.title}</p>
            </div>
        ))}
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0'}}>
            {postComments.length ? <Button text="Назад" onClick={() => setPostComments([])}/> : null}
        </div>
    </div>
  )
}
