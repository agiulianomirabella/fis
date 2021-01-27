# products

Trabajo realizado para la asignatura de Fundamentos de Ingeniería del Software del máster de FIS.

Se ha realizado el microservicio producto del equipo 4, Shopid.

Las APIS implementadas son:

#Get	

/products	Devuelve todos los productos del catálogo	200 – OK devuelve productos
500 – Internal Error Server
401 - Unauthorized

/products/:code	Devuelve un producto cuyo código corresponda con code	200 – OK devuelve productos
500 – Internal Error Server
404 – Product not found
401 - Unauthorized

/products?category=q	Devuelve todos los productos que pertenezcan a la categoría “q”	200 – OK devuelve productos
500 – Internal Error Server
401 - Unauthorized

/products?search=q	Busca un producto por texto “q”	200 – OK devuelve productos
500 – Internal Error Server
401 - Unauthorized
	
/products?provider=q	Devuelve el nombre de todos los proveedores	200 – OK devuelve productos
500 – Internal Error Server
401 - Unauthorized

#POST	

/products	Se añade un producto a la base de datos
Req params: body	
201 – Product Created
500 – Internal Error Server
401 - Unauthorized

#DELETE	
/products/:code	Se elimina el producto cuyo código corresponda con :code	
204 – No content
500- Internal Error Server
401 - Unauthorized

#PATCH	
/products/:code?amount=p	Se actualiza el stock de un producto cuyo código sea “code” con la cantidad indicada. Si se introduce una cantidad negativa, se resta al stock de producto (emulando la compra). Si pide una cantidad mayor al stock, se consulta el stock del proveedor. Si tiene stock disponible, se permite la compra, sino no	200 – OK devuelve productos
400 - Forbiden
500 – Internal Error Server
401 - Unauthorized

#PUT	
/products/:code	Actualiza todos los atributos de un producto cuyo código sea code.
Req params: body	
200 – Ok
500- Internal Error Server
401	- Unauthorized
