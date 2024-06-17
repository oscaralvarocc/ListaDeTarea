require('colors');

const { inquirerMenu, pausa, leerInput, listarTareas } = require('./helpers/inquirer');
const TaskManager = require('./models/taskManager');

const main = async () => {
    const taskManager = new TaskManager();
    let opt = '';

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                taskManager.agregarTarea(desc);
                console.log('Tarea agregada.'.green);
                break;

            case '2':
                const tareas = taskManager.obtenerTareas();
                listarTareas(tareas);
                break;

            case '3':
                const ids = await listarTareas(taskManager.obtenerTareas(), true);
                taskManager.alternarTareaCompletada(ids);
                console.log('Tarea(s) actualizada(s).'.yellow);
                break;

            case '4':
                const id = await listarTareas(taskManager.obtenerTareas(), false, true);
                if (id !== '0') {
                    taskManager.eliminarTarea(id);
                    console.log('Tarea eliminada.'.red);
                }
                break;

            case '0':
                break;

            default:
                console.log('Opción no válida.'.red);
                break;
        }

        if (opt !== '0') await pausa();
    } while (opt !== '0');
};

main();
