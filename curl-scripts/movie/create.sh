API="http://localhost:4741"
URL_PATH="/movies"

curl "${API}${URL_PATH}" \
--include \
--request POST \
  --header "Content-type: application/json" \
  --data '{
    "movie": {
      "title": "'"${TITLE}"'",
      "director":  "'"${DIRECTOR}"'",
      "releaseYear":  "'"${RELEASEYEAR}"'",
      "genre":  "'"${GENRE}"'",
      "rating": "'"${RATING}"'",
      "owner": "'"${OWNER}"'"
    }
  }'
echo
