import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Blog } from '../components/Bloglist'


test('renders content', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl',
        likes: 'testLikes'
    }
    
    const component = render(
        <Blog blog={blog} />
    )
    
    expect(component.container).toHaveTextContent(
        blog.title
    )

    expect(component.container).toHaveTextContent(
        blog.author
    )

    expect(component.container).not.toHaveTextContent(
        blog.url
    )

    expect(component.container).not.toHaveTextContent(
        blog.likes
    )
})