import { Button, useToast } from '@chakra-ui/react'

const CustomToastExample = () => {
    const toast = useToast()

    return (


        toast({
            title: 'Account created.',
            position: 'top-right',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    )
}
export default CustomToastExample