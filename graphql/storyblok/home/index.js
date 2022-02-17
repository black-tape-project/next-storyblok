import { gql } from "graphql-request";

export const HOME_QUERY = gql`
    {
        TemplateindexItem(id: "home") {
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
                title
                intro
                body
                seo_description
                seo_follow
                seo_index
                seo_title
            }
        }
    }
`;
