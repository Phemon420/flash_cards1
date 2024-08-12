import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getCardDetails from "../../redux/action/action";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, private_excludeVariablesFromRoot } from '@mui/material';

export default function ImgMediaCard() {
    const [count, setCount] = useState(1);
    const [isFlipped, setIsFlipped] = useState(true);
    const dispatch = useDispatch();
    const { loading, product: card, error } = useSelector(state => state.getProductDetails);

    const handleNext = () => {
        setCount(prevCount => prevCount + 1);
        handleFlipnope();
    };

    const handlePrevious = () => {
        setCount(prevCount => prevCount - 1);
        handleFlipnope();
    };
    
    const handleFlip = () => {
      setIsFlipped(prevState => !prevState);
    };

    const handleFlipnope = () => {
      setIsFlipped(true);
    };



    useEffect(() => {
        if (!loading && (!card || card.id !== count)) {
            dispatch(getCardDetails(count));
        }
    }, [dispatch, count, card, loading]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <CardActionArea onClick={handleFlip}>
            {
              isFlipped?
              <Card sx={{ maxWidth: 345, minHeight: 400, maxHeight: 750 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {'Click on card to see answer'}
                    </Typography>
                    <Typography variant="h4" color="text.secondary" sx={{ marginTop:10 }}>
                        {card.question}
                    </Typography>
                </CardContent>
            </Card>
            :
            <Card sx={{ maxWidth: 345, minHeight: 400, maxHeight: 750 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {'Click on card to see question'}
                    </Typography>
                    <Typography variant="h4" color="text.secondary" sx={{ marginTop:10 }}>
                        {card.answer}
                    </Typography>
                </CardContent>
            </Card>
            }
            </CardActionArea>

            <div style={{ maxWidth: 345, margin: 'auto', marginTop: '6px' }}>
                {count > 1 && (
                    <Button
                        onClick={handlePrevious}
                        sx={{
                            backgroundColor: 'blue',
                            color: 'white',
                            width: count < 20 ? '48%' : '100%',
                            marginRight: '4px',
                            '&:hover': {
                                backgroundColor: 'black',
                            },
                        }}
                        size="medium"
                    >
                        Previous
                    </Button>
                )}
                {count < 20 && (
                <Button
                    onClick={handleNext}
                    sx={{
                        backgroundColor: 'blue',
                        color: 'white',
                        width: count > 1 ? '50%' : '100%',
                        '&:hover': {
                            backgroundColor: 'black',
                        },
                    }}
                    size="medium"
                >
                    Next
                </Button>
                )}
            </div>
        </>
    );
}