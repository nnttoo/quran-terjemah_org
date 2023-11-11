package dbmodule

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

//DBMain system database
type DBMain struct {
	dbpath string
	DB     *sql.DB
}

//NewdbMain membuat DbMain
func NewdbMain(dbfilepath string) *DBMain {
	r := &DBMain{}
	r.dbpath = dbfilepath

	db, err := sql.Open("sqlite3", r.dbpath)
	if err != nil {
		log.Println("db main error, file not found")
	}

	r.DB = db

	return r
}

//CloseDb close database if db not nill
func (i *DBMain) CloseDb() {
	if i.DB == nil {
		return
	}

	i.DB.Close()
}
