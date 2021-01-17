const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json: true});

class ProvidersResource{
    
    static providersUrl(resourceUrl){
        const providersServer = (process.env.PROVIDERS_URL || 'http://host.docker.internal:3500/api/v1');
        return urljoin(providersServer, resourceUrl);
    }

    //util para merter el api key en todos 
    static requestHeaders(){
        const providersKey = (process.env.PROVIDERS_APIKEY || ''); //la apikey por defecto no sé de donde sale. AÑADIR!!
        return {
            apikey: providersKey
        };
    }

    static getProviders(){
        const url = ProvidersResource.providersUrl("/providers");
        const options={
            headers: ProvidersResource.requestHeaders()
        }
        return request.get(url, options);
    }

    static putStockProveedor(){
        const url = ProvidersResource.providersUrl("/providers");
        const options={
            headers: ProvidersResource.requestHeaders()
        }

        return request.put(url, options);
    }

}

//AÑADIR PARA HACER UN GET DE INFO DE PROVEEDOR??? --> MOSTRAR LA INFO SOBRE EL VENDEDOR DE UN PRODUCTO EN EL FRONTEND
//VAMOS A HACER AL FINAL LO DE LOS COMENTARIOS DE UN PRODUCTO?

module.exports= ProvidersResource;