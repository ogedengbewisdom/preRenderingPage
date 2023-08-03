

const UserIdPage = (props) => {
    const {id} = props;

    return <h2>{id}</h2>
};

export default UserIdPage;

export const getServerSideProps = (context) => {
    const {params} = context;
    const userId = params.uId;

    return {
        props: {
            id: "UserId-" + userId
        }
    }
}