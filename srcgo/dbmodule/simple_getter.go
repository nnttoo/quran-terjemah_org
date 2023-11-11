package dbmodule

import (
	"database/sql"
	"log"
)

type SimpleGetter struct {
	Columns []string
	values  []interface{}
}

//NewSimpleGetter create new SimpleGetter from sql.rows
func NewSimpleGetter(rows *sql.Rows) *SimpleGetter {
	sg := &SimpleGetter{}

	columns, err := rows.Columns()
	if err != nil {
		return sg
	}

	count := len(columns)
	values := make([]interface{}, count)
	scanArgs := make([]interface{}, count)
	for i := range values {
		scanArgs[i] = &values[i]
	}

	sg.Columns = columns
	sg.values = values

	errscane := rows.Scan(scanArgs...)
	if errscane != nil {

		log.Println("errow scanes")
		log.Println(errscane)
	}

	return sg
}

//GetByName get interface by name
func (i *SimpleGetter) GetByName(columnname string) interface{} {
	valLength := len(i.values)

	for index, name := range i.Columns {

		if name == columnname {
			if index < valLength {
				return i.values[index]
			}
		}
	}

	return nil
}
