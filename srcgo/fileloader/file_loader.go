package fileloader

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type FileLoader struct {
	http.Handler
}

func NewFileLoader() *FileLoader {
	return &FileLoader{}
}

func readBody(req *http.Request) (result string) {
	defer func() {
		if err := recover(); err != nil {
			result = "ini result errpr"
		}
	}()

	reqbody, err2 := ioutil.ReadAll(req.Body)
	if err2 != nil {
		return err2.Error()
	}

	return string(reqbody)
}

func (h *FileLoader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	requestedFilename := strings.TrimPrefix(req.URL.Path, "/")

	defer func() {
		if err := recover(); err != nil {
			fmt.Println("Recovered from panic:", err)
			res.Write([]byte(""))
		}
	}()

	res.Write([]byte("in hasilnya" + req.Method + " ya" + requestedFilename))
}
