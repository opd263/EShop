import {Helmet} from 'react-helmet-async';

const Meta = ({title,description,keywords}) => {
  return (
     <Helmet>
        <title>{title}</title>
        <Meta name='description' content={description}/>
        <Meta name='keywords' content={keywords}/>
     </Helmet>
    );
};

Meta.defaultProps={
        title:"Welcome to Eshop",
        description:"We sell the best products",
        keywords:"elctronics"
}

export default Meta;