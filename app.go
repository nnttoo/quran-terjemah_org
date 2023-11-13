package main

import (
	"context"
	"quran-terjemah-go/srcgo"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {

	return "haiii"
}

func (a *App) OpenUrl(url string) string {
	srcgo.Open(url)

	return "ok"
}
func (a *App) OpenFolder(deffolder string) string {
	str, _ := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		DefaultDirectory: deffolder,
		Title:            "Select Folder",
	})

	return str
}
