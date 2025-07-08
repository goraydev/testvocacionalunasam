
const useTestVocacional = () => {

    const onLogin = (form) => {

        try {

            console.log(form);

        } catch (error) {
            console.error(error);
        }

    }

    return {
        onLogin
    }
}

export default useTestVocacional