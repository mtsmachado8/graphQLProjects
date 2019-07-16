import gql from 'graphql-tag'

export default gql `
    {
        authorized {
            id,
            email
        }
    }
`