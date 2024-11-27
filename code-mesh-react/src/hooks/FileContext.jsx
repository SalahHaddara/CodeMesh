import React, {createContext, useContext, useCallback, useReducer, useEffect} from 'react';
import {requestAPI} from './../utlis/request.js';
import {debounce} from 'lodash';
import {form} from "framer-motion/m";

const FileContext = createContext(null);

const initialState = {
    files: [],
    activeFile: null,
    loading: false,
    error: null,
};

function fileReducer(state, action) {
    switch (action.type) {
        case 'SET_FILES':
            return {...state, files: action.payload, loading: false};
        case 'SET_ACTIVE_FILE':
            return {...state, activeFile: action.payload};
        case 'UPDATE_FILE_CONTENT':
            return {
                ...state,
                files: state.files.map(f =>
                    f.id === action.payload.id
                        ? {...f, content: action.payload.content}
                        : f
                ),
                activeFile: state.activeFile?.id === action.payload.id
                    ? {...state.activeFile, content: action.payload.content}
                    : state.activeFile
            };
        case 'SET_LOADING':
            return {...state, loading: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload, loading: false};
        case 'CLEAR_ERROR':
            return {...state, error: null};
        default:
            return state;
    }
}

export function FileProvider({children}) {
    const [state, dispatch] = useReducer(fileReducer, initialState);

    const debouncedUpdate = useCallback(
        debounce(async (fileId, content) => {
            try {
                await requestAPI({
                    route: `files/${fileId}`,
                    method: 'PUT',
                    body: {content}
                });
            } catch (error) {
                dispatch({type: 'SET_ERROR', payload: 'Failed to save changes'});
            }
        }, 1000),
        []
    );

    const fetchFiles = useCallback(async () => {
        dispatch({type: 'SET_LOADING', payload: true});
        const response = await requestAPI({route: 'files'});
        if (response.success) {
            dispatch({type: 'SET_FILES', payload: response.data.files});
        } else {
            dispatch({type: 'SET_ERROR', payload: response.message});
        }
    }, []);

    const setActiveFileWithContent = useCallback(async (file) => {
        if (!file.content) {
            const response = await requestAPI({route: `files/${file.id}`});
            if (response.success) {
                dispatch({
                    type: 'SET_ACTIVE_FILE',
                    payload: {...file, content: response.data.content}
                });
            }
        } else {
            dispatch({type: 'SET_ACTIVE_FILE', payload: file});
        }
    }, []);


    const createFile = useCallback(async (name, language) => {
        console.log(name, language);
        const response = await requestAPI({
            route: 'files',
            method: 'POST',
            body: {name, content: 'Hello', language}
        });

        if (response.success) {
            await fetchFiles();
            setActiveFileWithContent(response.data.file);
        } else {
            dispatch({type: 'SET_ERROR', payload: response.message});
        }
    }, [fetchFiles, setActiveFileWithContent]);


    const deleteFile = useCallback(async (fileId) => {
        const response = await requestAPI({
            route: `files/${fileId}`,
            method: 'DELETE'
        });

        if (response.success) {
            if (state.activeFile?.id === fileId) {
                dispatch({type: 'SET_ACTIVE_FILE', payload: null});
            }
            await fetchFiles();
        } else {
            dispatch({type: 'SET_ERROR', payload: response.message});
        }
    }, [fetchFiles, state.activeFile]);

    const updateFileContent = useCallback((fileId, content) => {
        dispatch({type: 'UPDATE_FILE_CONTENT', payload: {id: fileId, content}});
        debouncedUpdate(fileId, content);
    }, [debouncedUpdate]);

    const clearError = useCallback(() => {
        dispatch({type: 'CLEAR_ERROR'});
    }, []);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const value = {
        ...state,
        fetchFiles,
        setActiveFileWithContent,
        createFile,
        deleteFile,
        updateFileContent,
        clearError
    };

    return (
        <FileContext.Provider value={value}>
            {children}
        </FileContext.Provider>
    );
}

export const useFiles = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFiles must be used within a FileProvider');
    }
    return context;
};