package main

import (
	"fmt"
	"net/http"
	"text/template"

)

func main() {
	fs := http.FileServer(http.Dir("."))
		http.Handle("/core/", fs)
	    http.Handle("/img/", fs)
		http.Handle("/player/", fs)



	http.Handle("/style.css", fs)
	http.Handle("/script.js", fs)

	http.HandleFunc("/", Home)

	fmt.Println("Server running on http://localhost:8080/")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Server error:", err)
	}
}

func Home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		fmt.Println("Invalid path:", r.URL.Path)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		fmt.Println("Invalid method")
		return
	}

	tmpl, err := template.ParseFiles("index.html")
	if err != nil {
		http.Error(w, "Failed to load page", http.StatusInternalServerError)
		fmt.Println("Template parse error:", err)
		return
	}

	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, "Failed to render page", http.StatusInternalServerError)
		fmt.Println("Template execution error:", err)
	}
}
