const fs = require ('fs');

class File{
    constructor(name){
        this.name = `${__dirname}/db/${name}.json`;

        try{
            this.elements = JSON.parse (fs.readFileSync(this.name,'utf-8'));
        }catch{
            this.elements= [];
        }
    }

    getAll(){
        return this.elements;
    }
    getById(id){
        return this.elements.find((elemento) => elemento.id === id);
    }

    async save(element){
        try{
            element = {
                id: this.elements.length ? this.elements [this.elements.length -1].id +1 : 1,
                ...element
            }
            this.elements.push(element);

            await fs.promises.writefile(this.name,JSON.stringify(this.elements,null,'\t'));
            console.log('elemento guardado con exito!');
            return { info:`${this.name},elemento guardado con existo`,element}

        }catch (error){
            console.log('error al guardar el elemento', error);
            return {info: 'error al guardar el elemento',error}
        }
    }

    async update  (id,element){
        try{
            let one = this.elements.find ((elemento) => elemento.id ===id);
            if (one){
                const newElement = {...one,...element}
                const index = this.elements.findeIndex ((elemento)=> elemento.id===id);
                this.elements[index] = newElement;

                await fs.promises.writeFile (
                    this.name,
                    JSON.stringify( this.elements,null,"/t")
                );
                console.log('elemento guardado')
                return {info:'elemento guardado', element:newElement}


            }else {
                console.log('elemento no encontrado')
                return {info: 'elemento no encontrado'};
            }
        }catch (error){
            console.log ('error al cargar el elemento', error);
            return {info:'error al cargar el elemento', error}
        }
    }

    async deleteById(id){
        try{
            let one = this.elements.find((elemento)=>elemento.id ===id)

            if(one){
                let index = this.elements.findeIndex((elemento)=>elemento.id ===id)
                const element = this.elements.splice(index,1)

            }else {
                console.log('elemento no encontrado')
                return {info: 'elemento no encontrado'};
            }
        }catch (error){
            console.log ('error al cargar el elemento', error);
            return {info:'error al cargar el elemento', error}
        }
        }

        delete(){
            fs.truncateSync(this.name,0,()=> console.log('contenido borrado', this.name));
            return {info: 'contendido borrado', name: this.name}
        }
    }

    module.exports = File;


