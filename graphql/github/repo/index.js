import { gql } from "graphql-request";

export const REPO_QUERY = gql`
    {
        repository(name: "next-storyblok", owner: "black-tape-project") {
            id
            name
            forks {
                totalCount
            }
            issues {
                totalCount
            }
            languages(first: 10) {
                totalSize
                edges {
                    size
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`;
