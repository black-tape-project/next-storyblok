import { gql } from "graphql-request";

export const SLUG_QUERY = gql`
    query data($slug: ID!) {
        TemplatedefaultItem(id: $slug) {
            id
            name
            slug
            full_slug
            path
            first_published_at
            published_at
            content {
                _editable
                _uid
                component
                body
                seo_description
                seo_follow
                seo_index
                seo_title
            }
        }
    }
`;
