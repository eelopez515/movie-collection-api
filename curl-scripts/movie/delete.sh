API="http://localhost:4741"
URL_PATH="/movies"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request DELETE \
echo
