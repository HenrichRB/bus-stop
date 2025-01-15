const urlBusLine: string = 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/';
const loadingInitial = document.getElementById("loading-initial")!;
const loadingSpinner = document.getElementById("loading-spinner")!;
const errorInitial = document.getElementById("error-initial")!;
const searchContainer = document.getElementById("search-container")!;
const routeInput = document.getElementById("route-search") as HTMLInputElement;
const suggestionList = document.getElementById("route-suggestions") as HTMLDataListElement;

interface BusLine {
    numero: number;
    nome: string;
    numeroNome: string;
    tipoLinha: string;
}

async function fetchBusLines(): Promise<BusLine[]> {
    try {
        
        const response = await fetch(urlBusLine);

        if (!response.ok) {
            throw new Error(`Erro ao buscar as linhas : ${response.statusText}`);
        }

        const data: BusLine[] = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Erro ao obter linhas de ônibus:", error);
        errorInitial.style.display = "block";
        loadingInitial.style.display = "none";
        loadingSpinner.style.display = "none";
        throw error;
    } 
}

function fillListRows(data: BusLine[]) {
    const datalist = suggestionList;

    datalist.innerHTML = '';

    data.forEach((line) => {
        const option = document.createElement('option');
        option.value = line.numeroNome;
        suggestionList.appendChild(option);
    });
}

async function initialize(): Promise<void>{
        loadingInitial.style.display = "block";
        loadingSpinner.style.display = "block";
        searchContainer.style.display = "none";
        try {
            const data = await fetchBusLines();

            if (data.length === 0) {
                console.warn("Nenhuma linha de ônibus encontrada");
                errorInitial.textContent = "Nenhuma linha de ônibus encontrada";
                errorInitial.style.display = "block"
                loadingInitial.style.display = "none";
                loadingSpinner.style.display = "none";
                searchContainer.style.display = "none";
                return;
            }

            fillListRows(data);
            loadingInitial.style.display = "none";
            loadingSpinner.style.display = "none";
            searchContainer.style.display = "block";
        } catch(error) {
            console.error("Erro durante a inicialização:", error);
            errorInitial.style.display = "block";
        
        } finally {
            loadingSpinner.style.display = "none"
        }
}

initialize();