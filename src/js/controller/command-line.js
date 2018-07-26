import { recastAPIservice } from '../service/recastAPI-service';
import { store } from '../state/store';
import { addCollaboratorCtrl } from './add-collaborator';


// on hit enter
function hitEnter() {
    document.getElementById('gitcmd').addEventListener('keydown', (e) => {
        //to remove error or success message
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        if (e.keyCode === 13) {
            event.preventDefault();
            
            //calling recast api
            recastAPIservice(document.getElementById('gitcmd').value).then((recastResponse) => {
                console.log('main.js action name = '+recastResponse.intents[0].slug);  
                if(recastResponse.intents[0].slug === 'create-git-repo'){
                store.dispatch({
                    type : recastResponse.intents[0].slug, 
                    data: {taskWidgetName: recastResponse.intents[0].slug, 
                            repositoryName: recastResponse.entities.git_repo[0].value
                            }
                }); 
                }else if(recastResponse.intents[0].slug === 'create-git-issue'){
                    store.dispatch({
                        type : recastResponse.intents[0].slug, 
                        data: {taskWidgetName: recastResponse.intents[0].slug, 
                                repositoryName: recastResponse.entities.git_repo[0].value, 
                                issuename: recastResponse.entities.git_issue[0].value
                            }
                    }); 
                }else if(recastResponse.intents[0].slug === 'fetch-all-git-issue'){
                    store.dispatch({
                        type : recastResponse.intents[0].slug, 
                        data: {taskWidgetName: recastResponse.intents[0].slug, 
                                repositoryName: recastResponse.entities.git_repo[0].value
                            }
                    }); 
                }else if(recastResponse.intents[0].slug === 'add-git-coleborator'){
                    addCollaboratorCtrl(recastResponse.entities.git_repo[0].value, recastResponse.entities.git_collaborator[0].value);
                }

            }).catch(function(err){
                console.log(err, 'error in main.js ...-');
            });
        }
    })
}

export { hitEnter };