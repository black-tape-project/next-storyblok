import { gql } from "graphql-request";

export const SLUG_QUERY = gql`
    query data($slug: ID!) {
        TemplatedefaultItem(id: $slug) {
            id
            name
            slug
            full_slug
            content {
                _editable
                _uid
                body
                component
                seo_description
                seo_follow
                seo_index
                seo_title
            }
        }
    }
`;
