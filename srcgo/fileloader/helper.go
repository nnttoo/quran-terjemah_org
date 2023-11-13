package fileloader

import (
	"encoding/base64"
	"net/http"
	"net/url"
)

func GetArgToFilePath(req *http.Request) string {
	arg := req.URL.Query().Get("arg")
	decoded, err := url.QueryUnescape(arg)
	if err != nil {
		panic(err)
	}

	decodedBase, err2 := base64.StdEncoding.DecodeString(decoded)
	if err2 != nil {
		panic((err2))
	}

	return string(decodedBase)
}
