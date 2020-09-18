API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}" \
--include \
--request POST \
  --header "Content-type: application/json" \
  --data '{
    "review": {
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'",
      "movieId": "'"${MOVIE_ID}"'",
      "owner": "'"${OWNER}"'"
    }
  }'
echo
