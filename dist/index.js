"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlBusLine = 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/';
const loadingInitial = document.getElementById("loading-initial");
const loadingSpinner = document.getElementById("loading-spinner");
const errorInitial = document.getElementById("error-initial");
const searchContainer = document.getElementById("search-container");
const routeInput = document.getElementById("route-search");
const suggestionList = document.getElementById("route-suggestions");
function fetchBusLines() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(urlBusLine);
            if (!response.ok) {
                throw new Error(`Erro ao buscar as linhas : ${response.statusText}`);
            }
            const data = yield response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.error("Erro ao obter linhas de ônibus:", error);
            errorInitial.style.display = "block";
            loadingInitial.style.display = "none";
            loadingSpinner.style.display = "none";
            throw error;
        }
    });
}
function fillListRows(data) {
    const datalist = suggestionList;
    datalist.innerHTML = '';
    data.forEach((line) => {
        const option = document.createElement('option');
        option.value = line.numeroNome;
        suggestionList.appendChild(option);
    });
}
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        loadingInitial.style.display = "block";
        loadingSpinner.style.display = "block";
        searchContainer.style.display = "none";
        try {
            const data = yield fetchBusLines();
            if (data.length === 0) {
                console.warn("Nenhuma linha de ônibus encontrada");
                errorInitial.textContent = "Nenhuma linha de ônibus encontrada";
                errorInitial.style.display = "block";
                loadingInitial.style.display = "none";
                loadingSpinner.style.display = "none";
                searchContainer.style.display = "none";
                return;
            }
            fillListRows(data);
            loadingInitial.style.display = "none";
            loadingSpinner.style.display = "none";
            searchContainer.style.display = "block";
        }
        catch (error) {
            console.error("Erro durante a inicialização:", error);
            errorInitial.style.display = "block";
        }
        finally {
            loadingSpinner.style.display = "none";
        }
    });
}
initialize();
