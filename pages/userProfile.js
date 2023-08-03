
const UserProfilePage = (props) => {
    const {username} = props
    return <h1>{username}</h1>
};

export const getServerSideProps = (context) => {
    return {
        props: {
            username: "Wisdom Ogedengbe"
        }
    }
};

export default UserProfilePage;