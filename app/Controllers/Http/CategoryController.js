'use strict'

const Category = use('App/Models/Category');

class CategoryController {
    async index ({ request, auth, response }) {        
        const categories = await Category.query().whereRaw('user_id = ?', [auth.user.id]).fetch();
    
        return categories;
    }

    async store ({ request, auth }) {
        const data = request.only(["name"]);
        const store = {
            name: data.name,
            user_id: auth.user.id
        }    
        const category = await Category.create(store);
    
        return category;
      }
    
      async update ({ auth, params, response, request }) {
        const categoryOfUser = await Category.query().whereRaw('user_id = ? and id = ?', [auth.user.id, params.id]).fetch().then( (categories) => categories.toJSON());
        
        if(typeof categoryOfUser[0] !== 'undefined') {
            const data = request.only(['name']);
            const category = await Category.findOrFail(params.id);

            await category.merge(data);
            await category.save();
                
            return category;
        }
        else {
            return response.status(403).send('Área não autorizada');
        }
      }
    
      async destroy ({ auth, params, response, request }) {    
          const categoryOfUser = await Category.query().whereRaw('user_id = ? and id = ?', [auth.user.id, params.id]).fetch().then( (categories) => categories.toJSON());
                  
          if(typeof categoryOfUser[0] !== 'undefined') {
              const category = await Category.findOrFail(params.id);
              await category.delete();

              return category;
          }
          else {
              return response.status(403).send('Área não autorizada');
          }
      }
}

module.exports = CategoryController
