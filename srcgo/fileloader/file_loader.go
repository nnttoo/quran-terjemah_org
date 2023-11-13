package fileloader

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
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

	defer func() {
		if err := recover(); err != nil {
			fmt.Println("Recovered from panic:", err)
			res.Write([]byte(""))
		}
	}()

	filepathMp3 := GetArgToFilePath(req)
	file, err := os.Open(filepathMp3)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	info, err := file.Stat()
	if err != nil {
		panic(err)
	}

	// Menentukan jenis konten berdasarkan ekstensi file
	var contentType string
	switch filepath.Ext(filepathMp3) {
	case ".mp3":
		contentType = "audio/mpeg"
	case ".ogg":
		contentType = "audio/ogg"
	default:
		contentType = "application/octet-stream"
	}

	// Menetapkan header Content-Type dan Content-Length
	res.Header().Set("Content-Type", contentType)
	res.Header().Set("Content-Length", fmt.Sprintf("%d", info.Size()))

	// Menyalin file ke ResponseWriter
	_, err = io.Copy(res, file)
	if err != nil {
		// Menangani error saat menyalin file
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
}
