API="http://localhost:4741"
URL_PATH="/movies"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request PATCH \
  --header "Content-type: application/json" \
  --data '{
    "movie": {
      "title": "'"${TITLE}"'",
      "director":  "'"${DIRECTOR}"'",
      "releaseYear":  "'"${RELEASEYEAR}"'",
      "genre":  "'"${GENRE}"'",
      "rating": "'"${RATING}"'"
    }
  }'
echo
